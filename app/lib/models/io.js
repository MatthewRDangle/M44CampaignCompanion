"use strict";

export default class IO {

    /**
     * @constructor
     * @description Standardizes the communication pipeline between the server and client.
     *
     * @param {Object} message - The object to send to the server.
     */
    constructor(message) {
        this.message = this.message = message || undefined;
        this.result = undefined;

        // The information being sent to the server. Later will contain information received from the server.
        // Request is information being sent to the server. Response is information received from the server.
        this.package = {
            request: undefined,
            response: undefined
        }

        // How to send and receive the information.
        this.handler = undefined;
        this.useXML();
    }

    /**
     * @method serialize
     * @description Reconstructs the data into a format the client can read.
     */
    deserialize() {
        this.result = JSON.parse(this.package.response);
    }

    /**
     * @method useAjax
     * @description Calls the server via an ajax.
     */
    useXML() {
        this.handler = {
            url: location.origin + '/io',
            type: 'xml',
            format: 'POST',
            deserialize: this.deserialize,
            serialize: this.serialize
        }
    }

    /**
     * @method receive
     * @description Attaches data sent from the server.
     *
     * @param {string} response - The response sent from the server.
     */
    receive(response) {
        this.package.response = response || '';
        this.deserialize();
    }

    /**
     * @method send
     * @description Send data to the server.
     *
     * @param {function} [callback] - A function to execute when the response is received.
     */
    send(callback) {
        let io = this; // Used inside functions that destroy the "this" scope of this io.
        let handler = this.handler;

        // If the type of message is an ajax call, then send an ajax XML message.
        if (this.handler.type === 'xml') {
            let xml = new XMLHttpRequest();
            xml.open(handler.format, handler.url, handler.format)
            xml.setRequestHeader('Content-type', 'application/json');

            // Evaluate state change.
            xml.onreadystatechange = function(e) {

                // Successful response.
                if (this.readyState === 4 && this.status === 200) {
                    io.receive(this.responseText); // Store the response and deserialize it. Stored as result.

                    // If a callback function exists, execute it.
                    if (callback) {
                        callback(io.result);
                    }
                }
            }

            // After attaching all information, send the request.
            this.serialize(); // Prep the request to be sent.
            if (this.message && this.handler.format === 'POST')
                xml.send(this.message);
            else if (this.format === 'GET')
                xml.send();
        }
    }

    /**
     * @method serialize
     * @description Translates the data into a format the server can receive, parse, and reconstruct.
     */
    serialize() {
        this.package.request = JSON.stringify(this.message);
    }
};