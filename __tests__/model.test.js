'use strict';

const events = require('../events');
const supertest = require('supertest');

let payload = {
    store: 'STORE',
    orderID: '60124654-654000654-9869889',
    customer: 'Customer1',
    address: 'AMMAN_JORDAN'
};

jest.useFakeTimers();

describe('caps test', () => {

    it('pickup', () => {
        const caps = require('../caps/caps');
        caps.emit('pickup', payload);
        expect(caps.emit('pickup', payload)).toEqual(true);
    });

    it('in-transit', () => {
        const caps = require('../caps/caps');
        caps.emit('in-transit', payload);
        expect(caps.emit('in-transit', payload)).toEqual(true);
    });

    it('delivered', () => {
        const caps = require('../caps/caps');
        caps.emit('delivered', payload);
        expect(caps.emit('delivered', payload)).toEqual(true);
    });


});


describe('driver test', () => {

    it('pickup', () => {
        const driver = require('../src/driver/driver');
        driver.emit('pickup', payload);
        expect(driver.emit('pickup', payload)).toEqual(true);
    });

});



describe('vendor test', () => {
    it('delivered', () => {
        const vendor = require('../src/vendor/vendor');
        vendor.emit('delivered', payload);
        expect(vendor.emit('delivered', payload)).toEqual(true);
    });

});