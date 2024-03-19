
// import { convertToRaw } from 'draft-js';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import React from 'react';
// import { useState } from 'react';
// import {ContentState, Editor, EditorState } from 'react-draft-wysiwyg';
// import { Controller } from 'react-hook-form'
import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { Controller } from 'react-hook-form'
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

type Wysiwyg = {
    name: string
    control: any;
    defaultValue: string
}

const ReactWysiwyg: React.FC<Wysiwyg> = ({ name, control, defaultValue }) => {
    const [editorState, setEditorState] = React.useState(() => EditorState.createWithContent(ContentState.createFromBlockArray(htmlToDraft(defaultValue ? defaultValue : "").contentBlocks)))
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ref } }) =>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={(e: any) => { setEditorState(e); onChange(draftToHtml(convertToRaw(e.getCurrentContent()))) }}
                        wrapperClassName="wrapper-class"
                        editorClassName="editor-class"
                        toolbarClassName="toolbar-class"
                    />
                } />
        </>
    )
}

export default ReactWysiwyg




