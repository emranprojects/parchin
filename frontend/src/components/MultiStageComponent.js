import {useState} from "react"
import React from "react"

export default function ({components}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [sharedData, setSharedData] = useState(null)
    if (!(components?.length > 0))
        return <></>

    function getGoNextStageFunc(stageIndex) {
        function goNextStage(newSharedData) {
            setTimeout(() => {
                if (newSharedData !== undefined)
                    setSharedData(newSharedData)
                setCurrentIndex(i => {
                    if (i <= stageIndex)
                        return i + 1
                    return i
                })
            }, 0)
        }

        return goNextStage
    }

    const nextableComponents = components.map((c, index) =>
        React.cloneElement(c, {sharedData, goNextStage: getGoNextStageFunc(index)}),
    )

    return nextableComponents[currentIndex]
}
