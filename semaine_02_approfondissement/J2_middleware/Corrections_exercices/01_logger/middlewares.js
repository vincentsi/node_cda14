let counter = 0;

export function requestCounter(req, res, next) {
  counter++;
  req.counter = counter;
  next();
}

export function logger(req, res, next) {
  const method  = req.method.toUpperCase();
  const path    = req.path;
  const counter = req.counter ?? 0;
  const query   = isNotEmpty(req.query) ? JSON.stringify(req.query) : '';
  const body    = isNotEmpty(req.body) ? JSON.stringify(req.body) : '';

  console.log(`${counter}) ${method} ${path} ${query} ${body}`);

  next();
}

function isNotEmpty(obj) {
    return Object.keys(obj).length > 0;
}
