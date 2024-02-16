import { animate } from 'framer-motion';
import { RefObject } from 'react';
import { useLocation, useNavigate, To } from 'react-router';

export const useMyIdPresenceAnimation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const defaultWaitTime = 300;

    // const depths = new Map<string, number>([
    //     // path, depth
    //     ['myid', 0],
    //     ['myid/details', 1],
    //     ['myid/medical', 2],
    //     ['myid/criminal', 2],
    //     ['myid/contacts', 2],
    //     ['myid/relations', 2],
    //     ['myid/goals', 2],
    //     ['myid/meta', 2],
    //     ['myid/private-records', 2],
    //     ['myid/vibe', 2]
    // ]);

    const getDepth = (path: string) => {
        return path.split('/').length;
    };

    /**
     * Bypasses the issue with unmounting and <AnimatePresence> exit animation.
     * Requires a className of 'navigation-hook' on the element that is being animated.
     */
    const myIdNavigate = (
        newPath: string | -1,
        ref: RefObject<HTMLElement>,
        waitTime = defaultWaitTime
    ) => {
        const currentDepth = getDepth(location.pathname);
        const nextDepth = newPath === -1 ? currentDepth - 1 : getDepth(newPath);
        const navHook = ref.current!.querySelector('.navigation-hook')!;

        animate(
            navHook ?? ref.current!,
            { x: '-100vh' },
            { duration: waitTime / 1000 }
        );
        setTimeout(() => navigate(newPath as To), waitTime);
    };

    const myIdNavigateBack = (waitTime = defaultWaitTime) => {
        window.animate = animate;
        document.querySelectorAll('.navigation-hook').forEach((el) => {
            el.classList.add('my-id-nav-leave');
        })
        // navHookBack &&
        //     animate(navHookBack, { x: '100vh' }, { duration: waitTime / 1000 });
        setTimeout(() => {
            navigate(-1)
            // const navHookNew = document.querySelector('.navigation-hook')!;
    
            // navHookNew &&
            //     animate(navHookNew, { x: 0 }, { duration: waitTime / 1000 });
        }, waitTime);
    };

    return { myIdNavigate, myIdNavigateBack };
};
