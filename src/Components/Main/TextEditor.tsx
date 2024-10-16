'use client'


declare global {
    interface Window {
        RichTextEditor: any;  // Declare it as `any` or a specific type if known
    }
}
interface Prop {
    onChange?: (value: string) => void,
    defaultValue?: string
}

import { useEffect, useRef } from 'react';

const EditorPage = ({ onChange = () => { }, defaultValue = '' }: Prop) => {

    var refdiv = useRef(null);



    useEffect(() => {
        if (typeof window !== 'undefined' && window.RichTextEditor) {
            // Initialize the RichTextEditor
            const rte = new window.RichTextEditor(refdiv.current, { showFloatImageToolBar: true });
            rte.setHTMLCode(defaultValue);
            rte.attachEvent("change", function (e: Event) {
                onChange(rte.getHTMLCode())
            });

        }
    }, []);

    return (
        <div ref={refdiv} />
    );
};

export default EditorPage;