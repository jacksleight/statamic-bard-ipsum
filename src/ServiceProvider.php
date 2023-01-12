<?php

namespace JackSleight\StatamicBardIpsum;

use Illuminate\Support\Arr;
use JackSleight\StatamicBardMutator\Facades\Mutator;
use JackSleight\StatamicBardIpsum\Marks\Span;
use Statamic\Fieldtypes\Bard\Augmentor;
use Statamic\Providers\AddonServiceProvider;
use Statamic\Statamic;

class ServiceProvider extends AddonServiceProvider
{
    protected $scripts = [
        __DIR__.'/../dist/js/addon.js',
    ];
}
