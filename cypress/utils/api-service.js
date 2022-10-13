const axios = require("axios");
const { data, integration } = require("../fixtures/tenantConfig")
require("dotenv").config();

class ApiClient {

    async getAuthToken() {

        let payload = {
            username: data.user,
            password: data.password
        };

        let res = await axios.post(`${data.baseUrl}/api/iam/v1/auth/login`, payload);

        let authToken = res.data.authToken;
        console.log(authToken);
        return authToken;
    }

    async getProjectIdByKey(key) {
        let authToken = await this.getAuthToken();

        let res = await axios.get(`${data.baseUrl}/api/projects/v1/projects/key:${key}`, { headers: { 'Authorization': 'Bearer ' + await authToken } });

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
        let projectId = res.data.data.id;
        console.log(projectId);
        return projectId;
    }

    async deleteProjectById(id) {
        if (id != 1) {
            let authToken = await this.getAuthToken();

            let res = await axios.delete(`${data.baseUrl}/api/projects/v1/projects/${id}:purge`,
                { headers: { 'Authorization': 'Bearer ' + await authToken } });

            console.log(res.config.method);
            console.log(res.config.url);
            console.log(res.config.headers);
            let status = res.status
            console.log("Status is ", status);
            console.log(`Project with id ${id} was deleted!`);
            return status;
        } else { return console.log("Unable delete DEF project") }
    }
    async addJiraXrayIntegration(projectId) {

        if (integration.jira.token === undefined
            || integration.jira.url === undefined
            || integration.jira.username === undefined
            || integration.xray.clientId === undefined
            || integration.xray.clientSecret === undefined
            || integration.xray.ulr === undefined) {
            throw 'Jira and Xray creds should not be undefined!'
        }

        let authToken = await this.getAuthToken();
        let payload = {
            enabled: true,
            encrypted: false,
            token: integration.jira.token,
            type: "CLOUD",
            url: integration.jira.url,
            username: integration.jira.username,

            xrayClientId: integration.xray.clientId,
            xrayClientSecret: integration.xray.clientSecret,
            xrayEncrypted: false,
            xrayHost: integration.xray.ulr
        };
        console.log("payload", payload)
        let res = await axios.put(`${data.baseUrl}/api/reporting/v1/integrations/jira?projectId=${projectId}`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);

        // let projectId = res.data.data.id;
        console.log(projectId);
        console.log("all  ", res);
        return projectId;
    }

    async addTestrailIntegration(projectId) {

        if (integration.testrail.url === undefined
            || integration.testrail.username === undefined
            || integration.testrail.password === undefined) {
            throw 'Testrail creds should not be undefined!'
        }

        let authToken = await this.getAuthToken();
        let payload = {
            enabled: true,
            url: integration.testrail.url,
            username: integration.testrail.username,
            password: integration.testrail.password
        };

        let res = await axios.put(`${data.baseUrl}/api/reporting/v1/integrations/testrail?projectId=${projectId}`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );
        console.log("Alllll", res);
        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
    }

    async addJiraZephurIntegration(projectId) {

        if (integration.jira.token === undefined
            || integration.jira.url === undefined
            || integration.jira.username === undefined
            || integration.zephur.zephyrSquadAccessKey === undefined
            || integration.zephur.zephyrSquadAccountId === undefined
            || integration.zephur.zephyrSquadSecretKey === undefined) {
            throw 'Jira and Zephur creds should not be undefined!'
        }

        let authToken = await this.getAuthToken();
        let payload = {
            enabled: true,
            encrypted: false,
            token: integration.jira.token,
            type: "CLOUD",
            url: integration.jira.url,
            username: integration.jira.username,

            zephyrSquadAccessKey: integration.zephur.zephyrSquadAccessKey,
            zephyrSquadAccessKeyEncrypted: false,
            zephyrSquadAccountId: integration.zephur.zephyrSquadAccountId,
            zephyrSquadSecretKey: integration.zephur.zephyrSquadSecretKey,
            zephyrSquadSecretKeyEncrypted: false
        };

        let res = await axios.put(`${data.baseUrl}/api/reporting/v1/integrations/jira?projectId=${projectId}`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
    }

    async startTestRun(projectKey, name) {
        let authToken = await this.getAuthToken();
        let payload = {
            name: name,
            startedAt: new Date(),
            framework: "Cypress"
        };

        let res = await axios.post(`${data.baseUrl}/api/reporting/v1/test-runs?projectKey=${projectKey}`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
        console.log(`Test run was registered by id ${res.data.id}`);
        return res.data.id;
    }

    async startTest(testRunId, name) {
        let authToken = await this.getAuthToken();
        let payload = {
            name: name,
            className: "com.test.MyTests",
            methodName: "featureTest()",
            startedAt: new Date()
        };

        let res = await axios.post(`${data.baseUrl}/api/reporting/v1/test-runs/${testRunId}/tests`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
        console.log(`Test was registered by id ${res.data.id}`);
        return res.data.id;
    }

    async sendRunLabels(testRunId, key, value) {
        let authToken = await this.getAuthToken();
        let payload = {
            items: [
                {
                    key: key,
                    value: value
                }
            ]
        };
        let res = await axios.put(`${data.baseUrl}/api/reporting/v1/test-runs/${testRunId}/labels`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
    }
    async sendTestLabels(testRunId, testId, key, value) {
        let authToken = await this.getAuthToken();
        let payload = {
            items: [
                {
                    key: key,
                    value: value
                }
            ]
        };
        let res = await axios.put(`${data.baseUrl}/api/reporting/v1/test-runs/${testRunId}/tests/${testId}/labels`,
            payload,
            { headers: { 'Authorization': 'Bearer ' + await authToken } }
        );

        console.log(res.config.method);
        console.log(res.config.url);
        console.log(res.config.headers);
    }


}
module.exports = ApiClient;