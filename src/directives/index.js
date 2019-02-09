import Vue from 'vue';

// Determine if an element is an HTML Element
const isElement = el => {
    return el && el.nodeType === Node.ELEMENT_NODE
}
// Set an attribute on an element
const setAttr = (el, attr, value) => {
    if (attr && isElement(el)) {
        el.setAttribute(attr, value)
    }
}

// Remove an attribute from an element
const removeAttr = (el, attr) => {
    if (attr && isElement(el)) {
        el.removeAttribute(attr)
    }
}
// Attach an event listener to an element
const eventOn = (el, evtName, handler) => {
    if (el && el.addEventListener) {
        el.addEventListener(evtName, handler)
    }
}

// Remove an event listener from an element
const eventOff = (el, evtName, handler, options) => {
    if (el && el.removeEventListener) {
        el.removeEventListener(evtName, handler)
    }
}


export const clickShowModal = Vue.directive('click-show-modal',{
    bind(el, binding, vnode) {

        const targets = Object.keys(binding.modifiers || {})
        const listener = () => {
            targets.forEach(target => {
                vnode.context.$root.$emit('show-modal', target, vnode.elm)
            })
        }

        eventOn(vnode.elm, 'click', listener)
        vnode.elm['boundedListener'] = listener


        if (el.tagName !== 'BUTTON') {
            // If element is not a button, we add `role="button"` for accessibility
            setAttr(el, 'role', 'button')
        }
    },
    unbind(el, binding, vnode) {
        eventOff(vnode.elm, 'click', vnode.elm['boundedListener'])
        if (el.tagName !== 'BUTTON') {

            removeAttr(el, 'role', 'button')
        }
    }
})

export const clickOutside = Vue.directive('click-outside', {
    bind: function (el, binding, vnode) {
        window.event = function (event) {
            if (!(el == event.target || el.contains(event.target)) && vnode.context.visible) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener('click', window.event)
    },
    unbind: function (el) {
        document.body.removeEventListener('click', window.event)
    },
});





Vue.directive('click-outside', clickOutside)
Vue.directive('click-show-modal', clickShowModal)