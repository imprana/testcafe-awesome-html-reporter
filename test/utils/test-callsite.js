import createCallsiteRecord from 'callsite-record';

function someFunc() {
  throw new Error('Hey ya!');
}

let callsiteRecord;

try {
  someFunc();
} catch (err) {
  callsiteRecord = createCallsiteRecord(err);
}

export default callsiteRecord;
