"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import { Button } from "@/components/ui/button";
import {
    Bold, Italic, List, ListOrdered, Quote, Heading1, Heading2, Heading3,
    Link as LinkIcon, Image as ImageIcon, Video, Undo, Redo,
    Code, Youtube as YoutubeIcon, Minus
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

interface TiptapEditorProps {
    content: string;
    onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL')
        if (url) {
            editor.chain().focus().setImage({ src: url }).run()
        }
    }, [editor]);

    const addYoutube = useCallback(() => {
        const url = window.prompt('YouTube URL')
        if (url) {
            editor.commands.setYoutubeVideo({ src: url })
        }

    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            return
        }

        // update
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
    }, [editor])


    return (
        <div className="flex flex-wrap items-center gap-1 p-2 bg-[#0F141A]/95 backdrop-blur-xl border border-white/10 rounded-xl mb-4 sticky top-24 z-20 shadow-2xl shadow-black/50 transition-all">
            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} className={`h-8 w-8 p-0 ${editor.isActive('bold') ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><Bold size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} className={`h-8 w-8 p-0 ${editor.isActive('italic') ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><Italic size={16} /></Button>
            </div>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 2 }) ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><Heading2 size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`h-8 w-8 p-0 ${editor.isActive('heading', { level: 3 }) ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><Heading3 size={16} /></Button>
            </div>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} className={`h-8 w-8 p-0 ${editor.isActive('bulletList') ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><List size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`h-8 w-8 p-0 ${editor.isActive('orderedList') ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><ListOrdered size={16} /></Button>
            </div>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`h-8 w-8 p-0 ${editor.isActive('blockquote') ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><Quote size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().setHorizontalRule().run()} className="h-8 w-8 p-0 text-gray-400 hover:text-white"><Minus size={16} /></Button>
            </div>

            <div className="w-px h-6 bg-white/10 mx-1" />

            <div className="flex bg-white/5 rounded-lg p-1 gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={setLink} className={`h-8 w-8 p-0 ${editor.isActive('link') ? 'bg-primary text-black hover:bg-primary/90' : 'text-gray-400 hover:text-white'}`}><LinkIcon size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={addImage} className="h-8 w-8 p-0 text-gray-400 hover:text-white"><ImageIcon size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={addYoutube} className="h-8 w-8 p-0 text-gray-400 hover:text-white"><YoutubeIcon size={16} /></Button>
            </div>

            <div className="flex-1" />

            <div className="flex gap-1">
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="h-8 w-8 p-0 text-gray-500 hover:text-white disabled:opacity-30"><Undo size={16} /></Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="h-8 w-8 p-0 text-gray-500 hover:text-white disabled:opacity-30"><Redo size={16} /></Button>
            </div>
        </div>
    )
}

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image,
            Link.configure({ openOnClick: false }),
            Youtube.configure({ controls: false }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[60vh] text-gray-300 leading-relaxed selection:bg-primary/30 blog-typography',
            },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            if (editor.isFocused) return;
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="flex flex-col relative w-full">
            <MenuBar editor={editor} />
            <div className="editor-container">
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}
