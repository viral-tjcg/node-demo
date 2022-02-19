import { Route } from 'react-router-dom';
function interpolateParams(string, params = {}) {
  return string.replace(/:([a-zA-Z]+)/g, (match, token1) => `${params[token1]}`);
}
const RouteWithSubRoutes = (initialProps) => {
    return (
        <Route path={initialProps.path} render={(props) => {
            const validRoutes = [initialProps.path, ...initialProps.subRoutes]
                .map(route => interpolateParams(route, props.match.params));

            return validRoutes.includes(props.location.pathname)
                ? <initialProps.baseComponent {...props} />
                : <div>Error</div>
        }} />

    );
};

export default RouteWithSubRoutes;