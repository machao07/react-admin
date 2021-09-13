import React from 'react';

interface Props {
    text: string;
}

const Tip: React.FC<Props> = (props) => {
    const { text } = props;
    return <p>{text}</p>;
};

export default Tip;