import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';

import { RouterLink } from '../../routes/components';

interface BreadcrumbsProps {
    name: string;
    route?: string;
    type: string
}

const Breadcrumb = ({ options } : {options: BreadcrumbsProps[]}) => {

    const separator = (
        <Box component="span" borderRadius="50%" height={4} width={4} bgcolor="text.disabled" />
    )

    return (
        <Breadcrumbs fontSize={14} mt={2}  separator={separator} aria-label="breadcrumb">
            {options?.map((option:any) => (
                option.type === 'link' ? (
                    <Link underline="hover" component={RouterLink} key="1" color="text.primary" href={option.route}>
                        {option.name}
                    </Link>
                ) : (
                    <Typography fontSize={14} key="3" color="inherit">
                        {option.name}
                    </Typography>
                )
            ))}
        </Breadcrumbs>
    )
}

export default Breadcrumb

