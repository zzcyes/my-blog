export const STORE_TYPE = {
    GETTERS: Symbol('getters'),
    MUTATIONS: Symbol('mutations'),
};

const DEFAULT_PREFIX = {
    [STORE_TYPE.GETTERS]: 'get',
    [STORE_TYPE.MUTATIONS]: 'set',
};

/**
 * 生成store函数-mutations/getters
 * @date 2020-05-28
 * @author zzcyes
 * @param {states} 传入的store的states
 * @param {prefix} 生成store函数的前缀
 * @param {type} 生成store函数的类型
 * @returns {Object} 返回包含store函数的对象
 */

const createStoreFn = ({
    states,
    type = STORE_TYPE.GETTERS,
    prefix = '',
}) => {
    if (!states)
        throw new TypeError('states are not allowed to be null or undefined');
    if (type !== STORE_TYPE.GETTERS && type !== STORE_TYPE.MUTATIONS)
        throw new TypeError(
            `The currently defined type could not be found,just ${STORE_TYPE.GETTERS} or ${STORE_TYPE.MUTATIONS}`
        );
    const PREFIX = prefix || DEFAULT_PREFIX[type];
    try {
        const EXPORT_DEFALUT = {};
        Object.keys(states).forEach((key) => {
            const [FITST, ...REST] = key;
            const FIRST_LETTER = FITST.toUpperCase();
            const REST_LETTER = REST.join('');
            const FN_NAME = `${PREFIX}${FIRST_LETTER}${REST_LETTER}`;
            if (type === STORE_TYPE.GETTERS) {
                EXPORT_DEFALUT[FN_NAME] = (state) => {
                    return state[key];
                };
            } else if (type === STORE_TYPE.MUTATIONS) {
                EXPORT_DEFALUT[FN_NAME] = (state, data) => {
                    state[key] = data;
                };
            } else {
                throw new TypeError(
                    `Error in function createStoreFn parameter type,${type}`
                );
            }
        });
        return EXPORT_DEFALUT;
    } catch (error) {
        console.error(error);
        return {};
    }
};

export default { STORE_TYPE, createStoreFn };
