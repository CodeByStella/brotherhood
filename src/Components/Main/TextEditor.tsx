'use client'


import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface TextEdtorProps {
    fieldchange: (content: string) => void;
}

export default function TextEditor({fieldchange} : TextEdtorProps) {

    const editorRef = useRef<any>(null);
    const API_KEY = process.env.NEXT_PUBLIC_TINY_MCE_API_KEY

    // To prevent content shifting
    return (
        <div className='mt-5 w-full max-sm:h-[250px] sm:h-[300px] md:h-[500px]'>
            <Editor
                apiKey={API_KEY}
                onEditorChange={(newValue, editor) => fieldchange(newValue)}
                onInit={(_evt, editor) => editorRef.current = editor}
                initialValue="Text Here"
                init={{
                height: 500,
                menubar: false,
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'blockquote', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter blockquote | ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | image | media | link | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px; padding: 10px; background-color: #F6F7F9;} body:focus { border-color: #F6F7F9; } '
                }}
            />
        </div>
    );
}
