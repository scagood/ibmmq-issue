require('segfault-handler').registerHandler('crash.log', process.exit);

const {
    MQC,
    MQCD,
    MQCNO,
    MQCSP,
    MQGMO,
    MQMD,
    MQOD,

    Get,
    GetDone,
    ConnxPromise,
    DiscPromise,
    OpenPromise,
    ClosePromise,
} = require('ibmmq');

(async () => {
    const connectionOptions = new MQCNO();
    const channelDefinition = new MQCD();

    channelDefinition.ConnectionName = 'ibmmq(1414)';
    channelDefinition.ChannelName = 'DEV.APP.SVRCONN';

    connectionOptions.ClientConn = channelDefinition;
    connectionOptions.Options |= MQC.MQCNO_CLIENT_BINDING;

    const contentSecurityPolicy = new MQCSP();
    contentSecurityPolicy.UserId = 'app';
    contentSecurityPolicy.Password = 'Passw0rd';

    connectionOptions.SecurityParms = contentSecurityPolicy;

    console.info('Calling ConnxPromise');
    const connectionHandle = await ConnxPromise('QM1', connectionOptions);

    const objectDescriptor = new MQOD();

    objectDescriptor.ObjectType = MQC.MQOT_Q;
    objectDescriptor.ObjectName = 'DEV.QUEUE.1';

    console.info('Calling OpenPromise');
    const objectHandle = await OpenPromise(
        connectionHandle,
        objectDescriptor,
        MQC.MQOO_INPUT_AS_Q_DEF,
    );

    const messageDescriptor = new MQMD();
    const getMessageOptions = new MQGMO();

    getMessageOptions.Options = (
        MQC.MQGMO_NO_SYNCPOINT |
        MQC.MQGMO_WAIT |
        MQC.MQGMO_CONVERT |
        MQC.MQGMO_FAIL_IF_QUIESCING
    );
    getMessageOptions.MatchOptions = MQC.MQMO_NONE;
    getMessageOptions.WaitInterval = MQC.MQWI_UNLIMITED;

    console.info('Calling Get');
    Get(
        objectHandle,
        messageDescriptor,
        getMessageOptions,
        (
            error,
            objectHandle,
            messageDescriptor,
            messageHeader,
            messageBuffer,
        ) => {
            if (error instanceof Error) {
                console.error(error);
                GetDone(objectHandle);
            }

            console.info(messageBuffer);
        },
    );
})();
