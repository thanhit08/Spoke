import EditorNodeMixin from './EditorNodeMixin';
import { Mesh, MeshBasicMaterial, PlaneBufferGeometry, DoubleSide } from 'three';
import linkIFrameUrl from "../../assets/iframe-icon.png";
import loadTexture from "../utils/loadTexture";

let linkHelperTexture = null;
export default class IFrameNode extends EditorNodeMixin(Mesh) {
    static nodeName = 'Inline Frame';
    static componentName = 'iframe';

    constructor(editor) {
        const geometry = new PlaneBufferGeometry();
        const material = new MeshBasicMaterial();
        material.map = linkHelperTexture;
        material.side = DoubleSide;
        material.transparent = true;
        super(editor, geometry, material);
        this.href = '';
    }

    serialize() {
        return super.serialize({
            iframe: {
                href: this.href
            }
        });
    }

    static async deserialize(editor, json) {
        const node = await super.deserialize(editor, json);
        const { href } = json.components.find(c => c.name === IFrameNode.componentName).props;
        node.href = href === undefined ? "" : href;
        return node;
    }

    copy(source, recursive = true) {
        super.copy(source, recursive);
        this.href = source.href;
        return this;
    }
    static async load() {
        linkHelperTexture = await loadTexture(linkIFrameUrl);
    }

    prepareForExport() {
        super.prepareForExport();
        this.addGLTFComponent(IFrameNode.componentName, {
            href: this.href
        });
    }


}