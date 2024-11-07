import { Link, Outlet } from 'react-router-dom';

function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Outlet />
			<nav>
				<ul>
					<li>
						<Link to='registration'>Registration</Link>
					</li>
					<li>
						<Link to='login'>Login</Link>
					</li>
					<li>
						<Link to='categories'>Categories</Link>
					</li>
					<li>
						<Link to='recipes'>Recipes</Link>
					</li>
					<li>
						<Link to='users'>Users</Link>
					</li>
					<li>
						<Link to='changepass'>Change Password</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default Home;
