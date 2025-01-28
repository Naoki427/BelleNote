import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { userId } = body;
    const result = await pool.query(
      'INSERT INTO memotable (user_id) VALUES($1) RETURNING *',
      [userId]
    );
    return NextResponse.json(result.rows[0], { status: 200 });
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