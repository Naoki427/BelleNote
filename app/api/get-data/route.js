import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const id = searchParams.get('id');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const order = searchParams.get('order');

    // console.log('Query parameters:', { id, search, sort, order });

    let query = 'SELECT id, name, sex, age, style, comment FROM memotable WHERE user_id = $1';
    const params = [id];

    if (search) {
      query += ' AND name ILIKE $2';
      params.push(`%${search}%`);
    }

    if (sort) {
      query += ` ORDER BY ${sort}`;
      if (order) {
        query += ` ${order}`;
      }
    }

  query += ' LIMIT 18'

    const result = await pool.query(query, params);
    return NextResponse.json(result.rows, { status: 200 });
  } catch (err) {
    console.error('Database error:', err);
    return NextResponse.json({ error: 'Database error', details: err.message }, { status: 500 });
  }
}