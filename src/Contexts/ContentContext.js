import * as React from 'react';
import {Nav} from './NavContext';

export const Content = React.createContext();

const ContentContext = ({children}) => {
    const {states:NavState} = React.useContext(Nav);
    const [content, setContent] = React.useState(null);
    const [currentContent, setCurrentContent] = React.useState(null);

    React.useEffect(() => {
        if (content) {
            var content_buffer = {
                type: null,
                name: null,
                id: null,
                content: null,
                delete: null,
                edit: null
            }
            switch (NavState.nav) {
                case 'units':
                    content_buffer.type = 'lesson';
                    content_buffer.name = content.lesson_name;
                    content_buffer.id = parseInt(content.lesson_id);
                    content_buffer.content = content.lesson_descrip;
                    content_buffer.delete = content.lesson_delete;
                    content_buffer.edit = content.lesson_edit;
                    break;
                case 'lessons':
                    content_buffer.type = 'module';
                    content_buffer.name = content.module_name;
                    content_buffer.id = parseInt(content.module_id);
                    content_buffer.content = content.module_descrip;
                    content_buffer.delete = content.module_delete;
                    content_buffer.edit = content.module_edit;
                    break;
                case 'content':
                    content_buffer.type = 'content';
                    content_buffer.name = content.unit_name;
                    content_buffer.id = parseInt(content.unit_id);
                    content_buffer.content = content.unit_content;
                    content_buffer.delete = content.unit_delete;
                    content_buffer.edit = content.unit_content_edit;
                    break;
                case 'modules':
                    content_buffer.type = 'class';
                    content_buffer.name = content.class_name;
                    content_buffer.id = content.class_id;
                    content_buffer.content = content.class_descrip;
                    content_buffer.delete = content.class_delete;
                    content_buffer.edit = content.class_edit;
                    break;
                case 'classes':
                    content_buffer.type = 'Your classes';
                    content_buffer.name = '';
                    content_buffer.id = '';
                    content_buffer.content = '';
                    content_buffer.delete = '';
                    content_buffer.edit = '';
                    break;
                default:
                    content_buffer.type = null;
                    content_buffer.name = null;
                    content_buffer.id = null;
                    content_buffer.content = null;
                    content_buffer.delete = null;
                    content_buffer.edit = null;
                    break;
            }
            setCurrentContent(content_buffer);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [content])

    return(
        <Content.Provider value={{
            states: {
                content: content,
                currentContent: currentContent
            },
            actions: {
                setContent: setContent,
                setCurrentContent: setCurrentContent
            }
        }}>
            {children}
        </Content.Provider>
    );
}
export default ContentContext;
