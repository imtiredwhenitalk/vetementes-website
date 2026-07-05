import claim from '../models/claim.ts';
import { get_status } from '../__test__/status.ts';
import console.log from '../middleware/console.ts';
import response from 'express';
import expect from 'expect';
import { api } from '../services/api';

function get_status() {
    if (api.services.response.status === 200) {
        expect(api.services.response.status).toBe(200);
        claim('API Service is working correctly');
        if (api.services.response.status === 401) {
            expect(api.services.response.status).toBe(401);
            claim('API Service is not working correctly' + api.services.response.status);
        }
    }
}

export default get_status;