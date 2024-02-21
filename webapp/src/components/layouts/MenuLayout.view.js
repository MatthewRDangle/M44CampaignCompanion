import m from "mithril";
import NavTitle from "../primitives/Title.view";
import Nav from "../composites/navs/MainNav.view";


const MainLayout = (initialVnode) => {


    return {
        view: (vNode) => {
            const { attrs } = vNode;
            const { list, title } = attrs


            return [
                m('img', {
                    className: 'absolute top-0 left-0 object-cover w-full h-full -z-10',
                    src: 'images/background.png',
                    role: 'presentation'
                }),
                m('div', {className: 'absolute top-[12vw] left-[10vw]'}, [
                    m(NavTitle, title),
                    m(Nav, { list }),
                ]),
                m('div', {className: 'flex justify-between absolute top-0 left-1/2 w-1/2 h-full'}, [
                    m('div', {className: 'bg-tertiary border-x-4 border-solid border-secondary-500 w-[22vw] -skew-x-[18deg] h-full'}),
                    m('div', {className: 'bg-tertiary border-x-4 border-solid border-secondary-500 w-[22vw] -skew-x-[18deg] h-full'})
                ])
            ]
        }
    }
}

export default MainLayout;