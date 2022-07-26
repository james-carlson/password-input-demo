function PasswordFeedback(props) {
    const { invalidReasons, isValid } = props;
    if (isValid === undefined) return null;
    return <section style={{ marginTop: '1rem'}}>
        <div style={{ backgroundColor: isValid ? '#73ff53' : '#ff5353', padding: '.5rem'}}>
            <b>{ isValid ? `All done!` : `Oops! Heads up:`}</b>
        </div>
        <div style={{ backgroundColor: isValid ? '#cdffd3' : '#ffcdcd'}}>
            <ul style={{ margin: '0', padding: '1rem 2rem 1rem'}}>
            { invalidReasons.length > 0 ?
                invalidReasons.map((reason) => <li key={reason}>{reason}</li>)
            : `Password reset successfully!`}
            </ul>
        </div>
    </section>
}

export default PasswordFeedback;