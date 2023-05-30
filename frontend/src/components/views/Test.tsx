import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import 'github-markdown-css';


export default function Test() {


    return (
        <div>
            {/*<div*/}
            {/*    dangerouslySetInnerHTML={{__html: mdParser.render(contentInfo.content) }}*/}
            {/*    className={'mainText'}*/}
            {/*    // style={{ backgroundColor: 'white' }}*/}
            {/*>*/}
            {/*</div>*/}
            <ReactMarkdown
                children={'A paragraph with *emphasis* and **strong importance**.\n' +
                    '\n' +
                    '> A block quote with ~strikethrough~ and a URL: https://reactjs.org.\n' +
                    '\n' +
                    '* Lists\n' +
                    '* [ ] todo\n' +
                    '* [x] done\n' +
                    '\n' +
                    'A table:\n' +
                    '\n' +
                    '| a | b |\n' +
                    '| - | - |'}
                remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
                rehypePlugins={[rehypeRaw]}
                // className={'mainText'}
                className="markdown-body"
                // style={{ backgroundColor: 'white' }}
            />
        </div>
    );
}