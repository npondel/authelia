
import sinon = require("sinon");

export interface UserDataStore {
    set_u2f_meta: sinon.SinonStub;
    get_u2f_meta: sinon.SinonStub;
    issue_identity_check_token: sinon.SinonStub;
    consume_identity_check_token: sinon.SinonStub;
}

export function UserDataStore(): UserDataStore {
    return {
        set_u2f_meta: sinon.stub(),
        get_u2f_meta: sinon.stub(),
        issue_identity_check_token: sinon.stub(),
        consume_identity_check_token: sinon.stub()
    };
}
