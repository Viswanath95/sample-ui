export function hasChildren(props) {
    const { items: children } = props;

    if(children === undefined) {
        return false;
    }

    if(children.constructor !== Array)  {
        return false;
    }
    if(children.length === 0) {
        return false;
    }
    return true;
}