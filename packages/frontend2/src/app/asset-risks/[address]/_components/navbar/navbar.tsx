import Image from 'next/image'
import Link from 'next/link'

import ScannerName from '../../_assets/scanner-name.svg?url'
import SmallLogo from '../../_assets/small-logo.svg?url'
import { InputWallet } from '../input-wallet'
import { WalletDrawer } from '../wallet-drawer'
import { NavbarDrawerTrigger } from './navbar-drawer-trigger'
import { WalletInfo } from './wallet-info'

export function Navbar() {
  return (
    <>
      <div className="sticky top-0 z-30 h-14 min-w-fit border-b border-[#272A3133] bg-[#E6E7EC] text-base dark:border-gray-850 lg:h-16">
        <nav className="relative mx-auto box-border flex h-full max-w-[1780px] items-center justify-between px-4 lg:px-8">
          <ul className="flex h-full items-center">
            <li className="mr-4 lg:mr-8">
              <Link href="/asset-risks">
                <div className="flex flex-row items-center gap-2">
                  <Image
                    src={SmallLogo}
                    alt="logo"
                    width={32}
                    height={32}
                    className="h-8 w-auto"
                  />
                  <Image src={ScannerName} alt="logo" width={100} height={32} />
                </div>
              </Link>
            </li>
          </ul>
          <div className="hidden items-center gap-3 md:flex">
            <InputWallet />
            <WalletInfo />
          </div>
          <div className="inline-block md:hidden">
            <WalletDrawer>
              <NavbarDrawerTrigger />
            </WalletDrawer>
          </div>
        </nav>
      </div>
    </>
  )
}
