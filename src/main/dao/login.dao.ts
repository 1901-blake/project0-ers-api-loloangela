import { SessionFactory } from '../util/session-factory';

export class LoginDao {
  public async login(username: string, password: string): Promise<any> {
    const pool = SessionFactory.getConnectionPool();
    let result;
    try {
      const client = await pool.connect();
      result = await client.query(
        'SELECT * FROM users WHERE username=$1 AND password=$2;',
        [username, password]);
      await client.release();
      console.log(`LoginDao Results: ${result.rows[0]['user_id']}`);
      return result.rows[0];
    } catch (error) {
      console.log(`An error occurred while trying to access the db:\n${error}`);
    }
  }
}