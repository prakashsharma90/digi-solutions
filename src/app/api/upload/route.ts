import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json(
                { error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' },
                { status: 400 }
            );
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json(
                { error: 'File size exceeds 5MB limit' },
                { status: 400 }
            );
        }

        const supabase = createAdminClient();
        const bucketName = 'uploads'; // Ensure this bucket exists in Supabase Storage

        // Create unique filename
        const timestamp = Date.now();
        const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filename = `${timestamp}-${originalName}`;

        const buffer = await file.arrayBuffer();

        // Upload to Supabase Storage
        const { data, error } = await supabase
            .storage
            .from(bucketName)
            .upload(filename, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (error) {
            console.error('Supabase upload error:', error);
            // Check if bucket doesn't exist error to give better feedback?
            // Usually returns a specific error object.
            return NextResponse.json(
                { error: `Upload failed: ${error.message}. Ensure 'uploads' bucket exists and is public.` },
                { status: 500 }
            );
        }

        // Get public URL
        const { data: publicUrlData } = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(filename);

        return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
            filename: filename
        });

    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file due to server error' },
            { status: 500 }
        );
    }
}
