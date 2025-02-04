import { DOCKER_SOCKET_PATH } from '$env/static/private';
import Dockerode from 'dockerode';

export const dockerode = new Dockerode({
	socketPath: DOCKER_SOCKET_PATH
});
