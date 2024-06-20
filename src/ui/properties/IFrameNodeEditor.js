import React, { Component } from "react";
import PropTypes from "prop-types";
import NodeEditor from "./NodeEditor";
import InputGroup from "../inputs/InputGroup";
import StringInput from "../inputs/StringInput";
import { FilterFrames } from "styled-icons/material/FilterFrames";

export default class IFrameNodeEditor extends Component {
    static propTypes = {
        editor: PropTypes.object,
        node: PropTypes.object
    };

    static iconComponent = FilterFrames;

    static description = "Embed an entire webpage over your hub's scene.";

    onChangeUrl = href => {
        this.props.editor.setPropertySelected("href", href);
    };

    render() {
        const node = this.props.node;

        return (
            <NodeEditor description={IFrameNodeEditor.description} {...this.props}>
                <InputGroup name="href">
                    <StringInput value={node.href} onChange={this.onChangeUrl} />
                </InputGroup>
            </NodeEditor>
        );
    }

}
