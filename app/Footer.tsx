import Link from "next/link"


const Footer = () => {

    return (
        <div>
            <footer className="footer relative footer-center p-10 bg-base-200 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <Link href="/" className="link link-hover">关于我们</Link>
                    <Link href="/" className="link link-hover">商务合作</Link>
                    <Link target="_blank" href="/" className="link link-hover">意见反馈</Link>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <span>友情链接:</span>
                        <span>locnelor</span>
                    </div>
                </nav>
                <aside>
                    <p>
                        <Link target="_blank" href="beian.miit.gov.cn">
                            冀ICP备114514号
                        </Link>
                    </p>
                </aside>
            </footer>
        </div>
    )
}
export default Footer