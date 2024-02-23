import m from "mithril";
import Divider from "../Divider.view";


const LobbyLayout = (initialVnode) => {


    return {
        view: (vNode) => {
            const { children } = vNode;


            return [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation',
                }),
                m('div', {className: 'relative pl-[7vw]'}, [
                    m('div', {className: 'absolute top-[7vh]'}, [
                        m('img', {
                            className: 'w-96 -ml-3',
                            src: 'images/wordmark.png',
                            alt: 'BattleCry',
                        }),
                        m('div', {className: 'flex gap-x-4 items-center'}, [
                            m('span', 'v1.0.0.alpha.0'),
                            m(Divider, { fancy: true })
                        ])
                    ]),
                ]),
                m('div', {className: 'relative h-75vh top-[25vh]'}, children),
            ]
        }
    }
}

export default LobbyLayout;