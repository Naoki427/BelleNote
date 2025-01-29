import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const { id, fieldName, fieldValue } = await req.json();
    console.log('Received data:', { id, fieldName, fieldValue });

    const query = `UPDATE memotable SET ${fieldName} = $1 WHERE id = $2`;
    const params = [fieldValue, id];

    console.log('Final query:', query);
    console.log('Query parameters:', params);

    const result = await pool.query(query, params);
    console.log('Query result:', result);
    if (result.rowCount === 0) {
        return NextResponse.json({ error: 'No rows updated' }, { status: 404 });
      }
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}

export async function GET(req) {
    try {
      console.log('GET request received');
      return NextResponse.json({ message: 'API is working!' }, { status: 200 });
    } catch (err) {
      console.error('Error:', err);
      return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
    }
  }