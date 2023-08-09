/*
 * @Author: zhangxin
 * @Date: 2022-05-06 10:25:52
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-05-06 10:26:30
 * @Description: 简单渲染器
 */

const vnode = () => {
    return {
        tag: 'div',
        props: {
            onClick: () => alert('方法')
        },
        children: '文本'
    }
}



function renderer(vnode, container) {
    if (typeof vnode === 'function') {
        mountComponets(vnode, container)
    }

    if (typeof vnode === 'object') {
        mountElement(vnode, container)
    }
}


function mountElement(vnode, container) {
    const el = document.createElement(vnode.tag)

    for (const key in vnode.props) {
        if (/^on/.test(key)) {
            el.addEventListener(
                key.substring(2).toLowerCase(),
                vnode.props[key]

            )
        }
    }


    if (typeof vnode.children === 'string') {
        el.appendChild(vnode.children)
    }
    if (Array.isArray(vnode.children)) {
        mountElement(vnode.children, el)
    }

    container.appendChild(el)

}


function mountComponets(vnode, container) {
    const result = vnode()

    mountElement(result, container)
}

// '' 容器
renderer(vnode, '')