import React, { useEffect } from 'react';
import { message } from 'antd';
import Quill from 'quill';
import 'react-quill/dist/quill.snow.css';
const QuillEditor = ({ setQuillMaps, setDataLoading }) => {
    let quill = null;
    let quillImages = [];
    useEffect(() => {
        quill = new Quill('#quill-editor', {
            theme: 'snow',
        })
        if (quill) {
            quill.on('text-change', (d, o, s) => {
                let html = quill.root.innerHTML;
                setQuillMaps(html)
            })
        }
    }, [])
    return (<div id="quill-editor" />)
}
export default QuillEditor
