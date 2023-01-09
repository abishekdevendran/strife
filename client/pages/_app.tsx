import '../styles/globals.css';
import { ToastBar, Toaster } from 'react-hot-toast';
import { UserProvider } from '../contexts/UserContext';
import AuthGuard from '../components/AuthGuard';
import { Poppins } from '@next/font/google';
import Layout from '../components/Layout';
// import { ThemeProvider } from '../contexts/ThemeContext';
import { ThemeProvider } from 'next-themes';
import { ReactElement } from 'react';
import CustomToast from '../components/CustomToast';

const poppins = Poppins({
	weight: ['900','800','600'],
	style: ['normal', 'italic'],
	subsets: ['latin'],
	fallback: ['sans-serif'],
	variable: '--font-poppins',
	display: 'swap',
});

export default function App({
	Component,
	pageProps,
}: {
	Component: any;
	pageProps: any;
}) {
	return (
		<ThemeProvider themes={['pastel', 'dark', 'valentine', 'night']}>
			<div
				className={`${poppins.className} transition-all delay-150 ease-in-out h-screen w-full`}
			>
				<UserProvider>
					<Layout>
						{Component.requireAuth ? (
							<AuthGuard>
								<Component {...pageProps} />
							</AuthGuard>
						) : (
							<Component {...pageProps} />
						)}
					</Layout>
					<Toaster>{(t) => <CustomToast t={t} />}</Toaster>
				</UserProvider>
			</div>
		</ThemeProvider>
	);
}
