import { HTMLVisualElement } from "../html/HTMLVisualElement"

const createVisualElement = () =>
    new HTMLVisualElement({
        props: {},
        presenceContext: null,
        visualState: {
            latestValues: {},
            renderState: {
                style: {},
                vars: {},
                transform: {},
                transformOrigin: {},
            },
        },
    } as any)

describe("VisualElement.sortNodePosition", () => {
    test("orders two mounted elements by DOM position", () => {
        const first = document.createElement("div")
        const second = document.createElement("div")
        document.body.append(first, second)

        const a = createVisualElement()
        const b = createVisualElement()
        a.mount(first)
        b.mount(second)

        expect(a.sortNodePosition(b)).toBe(-1)
        expect(b.sortNodePosition(a)).toBe(1)

        first.remove()
        second.remove()
    })

    test("returns 0 when the other element has not mounted yet", () => {
        /**
         * A child can be registered with its parent (and therefore appear in
         * enteringChildren) before it has mounted, so its current is still
         * null. Sorting must not call compareDocumentPosition(null).
         */
        const element = document.createElement("div")
        document.body.append(element)

        const mounted = createVisualElement()
        const unmounted = createVisualElement()
        mounted.mount(element)

        expect(mounted.sortNodePosition(unmounted)).toBe(0)
        expect(unmounted.sortNodePosition(mounted)).toBe(0)

        element.remove()
    })
})
