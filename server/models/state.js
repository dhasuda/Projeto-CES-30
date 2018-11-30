class State {
    
    static notSubmitted() {
        return 'not submitted'
    }

    static notCorrected() {
        return 'not corrected'
    }
    
    static inCorrection() {
        return 'in correction'
    }

    static corrected() {
        return 'corrected'
    }

    static published() {
        return 'published'
    }

    static returned() {
        return 'returned'
    }
}

module.exports = State