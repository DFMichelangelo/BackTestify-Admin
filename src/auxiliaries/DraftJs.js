import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js'
import draftToHtml from 'draftjs-to-html'

export function convertToDraft(html) {
    if (html) {
        const { contentBlocks, entityMap } = convertFromHTML(html)
        let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        //return convertFromHTML(html)
        return EditorState.createWithContent(contentState)

    } else {
        return EditorState.createEmpty()
    }
}

export function convertFromDraft(content) {
    return draftToHtml(convertToRaw(content.getCurrentContent()))
}