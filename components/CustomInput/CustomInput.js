import 'draft-js-hashtag-plugin/lib/plugin.css';
import React, { Component } from 'react';
import Editor from 'draft-js-plugins-editor';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import { EditorState } from 'draft-js';
import 'draft-js-linkify-plugin/lib/plugin.css';
import 'draft-js-mention-plugin/lib/plugin.css';
import Mention from '../Mention/Mention';

// import "../../node_modules/draft-js-hashtag-plugin/lib/plugin.css"
// import "../../node_modules/draft-js-mention-plugin/lib/plugin.css"
// import "../../node_modules/draft-js-linkify-plugin/lib/plugin.css"

const linkifyPlugin = createLinkifyPlugin();

let mentions = [
    {
        name: 'Matthew Russell',
        link: 'https://twitter.com/mrussell247',
        avatar: 'https://pbs.twimg.com/profile_images/517863945/mattsailing_400x400.jpg',
    },
    {
        name: 'Julian Krispel-Samsel',
        link: 'https://twitter.com/juliandoesstuff',
        avatar: 'https://avatars2.githubusercontent.com/u/1188186?v=3&s=400',
    },
    {
        name: 'Jyoti Puri',
        link: 'https://twitter.com/jyopur',
        avatar: 'https://avatars0.githubusercontent.com/u/2182307?v=3&s=400',
    },
    {
        name: 'Max Stoiber',
        link: 'https://twitter.com/mxstbr',
        avatar: 'https://pbs.twimg.com/profile_images/763033229993574400/6frGyDyA_400x400.jpg',
    },
    {
        name: 'Nik Graf',
        link: 'https://twitter.com/nikgraf',
        avatar: 'https://avatars0.githubusercontent.com/u/223045?v=3&s=400',
    },
    {
        name: 'Pascal Brandt',
        link: 'https://twitter.com/psbrandt',
        avatar: 'https://pbs.twimg.com/profile_images/688487813025640448/E6O6I011_400x400.png',
    },
]

export default class CustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            suggestions: mentions,
        };

        this.mentionPlugin = createMentionPlugin({
            mentionComponent: (mentionProps) => (
                <Mention mentionProps={mentionProps} />
            ),
        });
    }

    onChange = (editorState) => {
        this.props.onChanged({ ...editorState })
    };

    onSearchChange = ({ value }) => {
        this.setState({
            suggestions: defaultSuggestionsFilter(value, mentions),
        });
    };

    focus = () => {
        this.editor.focus();
    };

    render() {
        let { editing, content } = this.props;
        const { MentionSuggestions } = this.mentionPlugin;
        const plugins = [this.mentionPlugin, linkifyPlugin];

        return (
            <div onClick={this.focus}>
                <Editor
                    readOnly={!editing}
                    editorState={{ ...content }}
                    onChange={this.onChange}
                    plugins={plugins}
                    ref={(element) => { this.editor = element; }}
                />
                <MentionSuggestions
                    onSearchChange={this.onSearchChange}
                    suggestions={this.state.suggestions}
                    onAddMention={this.onAddMention}
                />
            </div>
        );
    }
}
