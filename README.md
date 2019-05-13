# Base 64 Microservice

### Endpoints:

- `/:param`
  - if :param is a valid base 64 hash it will be decoded an returned
  - if the decoded hash is a valid url then you will automatically be redirected to it
    - ex: /aHR0cHM6Ly9nb29nbGUuY29t goes to https://google.com
  - if the hash is not base 64 it will be encoded and returned
- `/d/:param`
  - decode :param and return it
  - This will not redirect you if the hash is a valid url
- `/e/:param`
  - encode :param and return it
- `/is/:param`
  - return true if the hash is valid base 64, else return false
- `/rick`
  - just try it for yourself
