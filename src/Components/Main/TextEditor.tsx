'use client'


declare global {
    interface Window {
        RichTextEditor: any;  // Declare it as `any` or a specific type if known
    }
}
interface Prop {
    onChange?: (value: string) => void,
    value?: string
}

import { useEffect, useRef } from 'react';

const EditorPage = ({ onChange = () => { }, value = '' }: Prop) => {

    var refdiv = useRef(null);



    useEffect(() => {
        if (typeof window !== 'undefined' && window.RichTextEditor) {
            // Initialize the RichTextEditor
            const rte = new window.RichTextEditor(refdiv.current, { showFloatImageToolBar: true });
            rte.setHTMLCode(value);
            if ('' === rte.getHTMLCode())
                rte.attachEvent("change", function (e: Event) {
                    onChange(rte.getHTMLCode())
                });
            return () => { }
        }
    }, [value]);

    return (
        <div ref={refdiv} />
    );
};

export default EditorPage;