class EncryptorSHA256 {
    static async computeSha256Hash(input) {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return new Uint8Array(hash);
    }

    static async generate128BitIV(input) {
        const hashBytes = await this.computeSha256Hash(input);
        return hashBytes.slice(0, 16);
    }

    static async encrypt(plainText, keyString, ivString) {
        const keyBytes = await this.computeSha256Hash(keyString);
        const ivBytes = await this.generate128BitIV(ivString);

        const key = await crypto.subtle.importKey(
            'raw',
            keyBytes,
            { name: 'AES-CBC' },
            false,
            ['encrypt']
        );

        const encoder = new TextEncoder();
        const data = encoder.encode(plainText);

        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-CBC', iv: ivBytes },
            key,
            data
        );

        return this.arrayBufferToBase64(encrypted);
    }

    static async decrypt(cipherText, keyString, ivString) {
        try {
            const keyBytes = await this.computeSha256Hash(keyString);
            const ivBytes = await this.generate128BitIV(ivString);
            const cipherBytes = this.base64ToArrayBuffer(cipherText);

            const key = await crypto.subtle.importKey(
                'raw',
                keyBytes,
                { name: 'AES-CBC' },
                false,
                ['decrypt']
            );

            const decrypted = await crypto.subtle.decrypt(
                { name: 'AES-CBC', iv: ivBytes },
                key,
                cipherBytes
            );

            const decoder = new TextDecoder();
            return decoder.decode(decrypted);
        } catch (ex) {
            return `Error: ${ex.message}\n\nSolution: Incorect Key or IV`
        }
    }

    static arrayBufferToBase64(buffer) {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }

    static base64ToArrayBuffer(base64) {
        const binaryString = atob(base64);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        return bytes.buffer;
    }
}