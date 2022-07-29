import {useState} from "react"
import React from "react"

export default function ({components}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [sharedData, setSharedData] = useState(null)
    if (!(components?.length > 0))
        return <></>

    function goNextStage(newSharedData) {
        setTimeout(() => {
            if (newSharedData !== undefined)
                setSharedData(newSharedData)
            setCurrentIndex(i => i + 1)
        }, 0)
    }

    const nextableComponents = components.map(c => React.cloneElement(c, {sharedData, goNextStage}))

    return nextableComponents[currentIndex]
}
