import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(req) {
    try {
        const body = await req.json();
        console.log('Request body:', body);
        const { id } = body;
        console.log('delete-id: ',id)
        const result = await pool.query('DELETE FROM memotable WHERE id = $1', [id]);
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (err) {
        console.error('Database error:', err);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}