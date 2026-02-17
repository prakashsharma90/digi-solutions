import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const path = searchParams.get('path');

        if (!path) {
            return NextResponse.json(
                { error: 'Path parameter is required' },
                { status: 400 }
            );
        }

        // Revalidate the specific path
        revalidatePath(path);

        // Also revalidate the blog list page
        revalidatePath('/blog');
        revalidatePath('/admin/blogs');

        return NextResponse.json({
            success: true,
            revalidated: true,
            path: path,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Revalidation error:', error);
        return NextResponse.json(
            { error: 'Failed to revalidate' },
            { status: 500 }
        );
    }
}
