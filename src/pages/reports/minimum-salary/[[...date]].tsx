import useDatesFromPath from "@naoMentem/hooks/useDatesFromPath";

export default function MinimumSalary() {
    const { from, to } = useDatesFromPath();
    return (<>
        <p>
            Salário mínimo<br/>
            from: {from.getUTCFullYear()}<br/>
            to: {to.getUTCFullYear()}
        </p> 
    </>)
}