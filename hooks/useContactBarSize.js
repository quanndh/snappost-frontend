import React, { useLayoutEffect, useState } from 'react';
React.useLayoutEffect = React.useEffect;

function useContactBarResize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([document.getElementById("contactBar").getBoundingClientRect().width, document.getElementById("contactBar").getBoundingClientRect().height]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default useContactBarResize;