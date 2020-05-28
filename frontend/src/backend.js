import superagent from 'superagent';
import superagentUse from 'superagent-use';

const BACKEND_URL = '';

const agent = superagentUse(superagent);
agent.use(req => {
  req.url = BACKEND_URL + req.url;
  return req;
});

export default agent;
